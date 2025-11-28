import { SignupForm } from '@/components/signup-form';

const SignUpPage = () => {
	return (
		<div className='bg-muted relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
			<div className='absolute inset-0 z-0 radient-bg' />
			<div className='w-full max-w-sm md:max-w-4xl relative'>
				<SignupForm />
			</div>
		</div>
	);
};

export default SignUpPage;
