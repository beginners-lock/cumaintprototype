export const STUDENT_CREATE_ACC_INSTRUCTIONS = <div className="text-sm">
    Firstname: This field must not be empty<br className="mb-1"/>
    Lastname: This field must not be empty<br className="mb-1"/>
    Email: This must be your school email <em className="font-semibold">(firstname.lastname@stu.cu.edu.ng)</em><br className="mb-1"/>
    Password: This must not be less than 8 characters
</div>;

export const STUDENT_LOGIN_INSTRUCTIONS = <div className="text-sm">
    Email: This must be your school email <em className="font-semibold">(firstname.lastname@stu.cu.edu.ng)</em><br className="mb-1"/>
    Password: This must not be less than 8 characters
</div>;

export const STAFF_CREATE_ACC_INSTRUCTIONS = <div className="text-sm">
    Firstname: This field must not be empty<br className="mb-1"/>
    Lastname: This field must not be empty<br className="mb-1"/>
    Email: This must be a valid email <br className="mb-1"/>
    Password: This must not be less than 8 characters
</div>;

export const STAFF_LOGIN_INSTRUCTIONS = <div className="text-sm">
    Email: This must be the email use registered with
    Password: This must not be less than 8 characters
</div>;

export const EMAIL_ALREADY_REGISTERD = 'A user has already been registered with this email';
export const VERIFICATION_EMAIL = 'An email has been sent the account, follow the link to verify your account';
export const ACCOUNT_CREATED = 'Account creation successful';
export const WRONG_CREDS = 'Wrong credentials';
export const LOGIN_SUCCESS = 'Login successful';
export const ADMIN_LOGIN_SUCCESS = 'Admin login successful';
export const USER_NOT_EXISTS = 'This email is not registered';