import { Resend } from "resend"

// Initialize Resend with API key from environment variable
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendResetPasswordEmail(email: string, resetLink: string, userName?: string) {
  try {
    // Check if Resend is configured
    if (!resend || !process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured. Please add it to your .env file.")
      console.log(`[DEV MODE] Reset password link for ${email}: ${resetLink}`)
      throw new Error("Email service is not configured. Please set RESEND_API_KEY in .env file.")
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    
    console.log(`[EMAIL] Attempting to send email to: ${email}`)
    console.log(`[EMAIL] From: ${fromEmail}`)
    console.log(`[EMAIL] Reset link: ${resetLink}`)
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Đặt lại mật khẩu - CodeX Studio",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Đặt lại mật khẩu</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">CodeX Studio</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
              <h2 style="color: #1f2937; margin-top: 0;">Đặt lại mật khẩu</h2>
              
              <p>Xin chào ${userName || "bạn"},</p>
              
              <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nhấp vào nút bên dưới để đặt lại mật khẩu:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; padding: 12px 30px; text-decoration: none; 
                          border-radius: 5px; font-weight: bold;">
                  Đặt lại mật khẩu
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px;">
                Hoặc copy và dán link sau vào trình duyệt:<br>
                <a href="${resetLink}" style="color: #667eea; word-break: break-all;">${resetLink}</a>
              </p>
              
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>⚠️ Lưu ý:</strong> Link này chỉ có hiệu lực trong <strong>30 phút</strong>. 
                  Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
                </p>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Trân trọng,<br>
                <strong>Đội ngũ CodeX Studio</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
              <p>Email này được gửi tự động, vui lòng không trả lời.</p>
              <p>&copy; ${new Date().getFullYear()} CodeX Studio. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("[EMAIL ERROR] Resend API error:", error)
      console.error("[EMAIL ERROR] Error details:", JSON.stringify(error, null, 2))
      
      // Check if it's a domain verification error
      if (error.message && error.message.includes("verify a domain")) {
        console.error("[EMAIL ERROR] Domain not verified. Please verify your domain in Resend Dashboard.")
        throw new Error("Domain chưa được verify. Vui lòng verify domain trong Resend Dashboard để gửi email đến địa chỉ khác.")
      }
      
      throw new Error(`Failed to send email: ${error.message || JSON.stringify(error)}`)
    }

    console.log(`[EMAIL SUCCESS] Email sent successfully to ${email}`)
    console.log(`[EMAIL SUCCESS] Email ID: ${data?.id}`)
    
    return { success: true, data }
  } catch (error) {
    console.error("Error sending reset password email:", error)
    throw error
  }
}

