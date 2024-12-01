from allauth.account.adapter import DefaultAccountAdapter

class MyAccountAdapter(DefaultAccountAdapter):

    def send_mail(self, template_prefix, email, context):
        # Customize the email subject here
        if template_prefix == 'account/email/email_confirmation':
            context['subject'] = '[Important!] Please Confirm Your Email Address'
        
        # Call the super method with updated context
        super().send_mail(template_prefix, email, context)
