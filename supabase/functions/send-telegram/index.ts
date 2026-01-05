import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, phone, message } = await req.json();
    
    console.log('Received form data:', { fullName, email, phone, message });

    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!botToken || !chatId) {
      console.error('Missing Telegram credentials');
      throw new Error('Telegram credentials not configured');
    }

    // Format message for Telegram
    const telegramMessage = `
📬 *Нове повідомлення з сайту*

👤 *Ім'я:* ${fullName}
📧 *Email:* ${email}
📱 *Телефон:* ${phone || 'Не вказано'}

💬 *Повідомлення:*
${message}
    `.trim();

    console.log('Sending message to Telegram...');

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();
    
    console.log('Telegram API response:', result);

    if (!result.ok) {
      console.error('Telegram API error:', result);
      throw new Error(result.description || 'Failed to send message');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send-telegram function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
