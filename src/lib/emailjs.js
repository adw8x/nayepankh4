import emailjs from '@emailjs/browser'

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

if (!publicKey) {
  console.error('Missing EmailJS public key')
} else {
  emailjs.init(publicKey)
}

export async function sendVolunteerWelcome(name, email, programs) {
  try {
    const response = await emailjs.send(
      'service_nayepankh',
      import.meta.env.VITE_EMAILJS_VOLUNTEER_TEMPLATE_ID,
      {
        volunteer_name: name,
        volunteer_email: email,
        programs_selected: programs.join(', '),
        to_email: email,
      }
    )
    return response
  } catch (error) {
    console.error('Error sending volunteer welcome email:', error)
    throw error
  }
}

export async function sendContactForm(name, email, phone, subject, message) {
  try {
    const response = await emailjs.send(
      'service_nayepankh',
      import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        from_phone: phone,
        subject: subject,
        message: message,
        to_email: import.meta.env.VITE_ADMIN_EMAIL || 'contact@nayepankh.org',
      }
    )
    return response
  } catch (error) {
    console.error('Error sending contact form:', error)
    throw error
  }
}

export async function sendAdminNotification(volunteer) {
  try {
    const response = await emailjs.send(
      'service_nayepankh',
      import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID,
      {
        volunteer_name: volunteer.name,
        volunteer_email: volunteer.email,
        volunteer_phone: volunteer.phone,
        programs: volunteer.programs.join(', '),
        to_email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@nayepankh.org',
      }
    )
    return response
  } catch (error) {
    console.error('Error sending admin notification:', error)
    throw error
  }
}
