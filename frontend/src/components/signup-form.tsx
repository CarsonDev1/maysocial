import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { GoogleAuthButton } from './google-auth-button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/useAuthStore';
import { Link, useNavigate } from 'react-router';
import z from 'zod';

const signupSchema = z
	.object({
		firstName: z.string().min(2, 'Họ phải có ít nhất 2 ký tự'),
		lastName: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
		email: z.string().email('Email không hợp lệ'),
		password: z
			.string()
			.min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
			.regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
			.regex(/[!@#$%^&*(),.?":{}|<>]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'),
		confirmPassword: z.string().min(8, 'Xác nhận mật khẩu phải có ít nhất 8 ký tự'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Mật khẩu không khớp',
		path: ['confirmPassword'],
	});

type signupFormValues = z.infer<typeof signupSchema>;

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
	const { signUp } = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<signupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: signupFormValues) => {
		try {
			await signUp({
				password: data.password,
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
			});
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className='overflow-hidden p-0'>
				<CardContent className='grid p-0 md:grid-cols-2'>
					<form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup className='gap-5'>
							<div className='flex flex-col items-center gap-2 text-center'>
								<h1 className='text-2xl font-bold'>Tạo tài khoản MAY</h1>
								<p className='text-muted-foreground text-sm text-balance'>
									Chào mừng bạn! Hãy đăng ký để bắt đầu!
								</p>
							</div>
							<Field>
								<Field className='grid grid-cols-2 gap-4'>
									<Field>
										<FieldLabel htmlFor='firstName'>Họ</FieldLabel>
										<Input
											id='firstName'
											type='firstName'
											required
											placeholder='Nguyễn Văn'
											{...register('firstName')}
										/>
										<p className='text-destructive text-sm'>{errors.firstName?.message}</p>
									</Field>
									<Field>
										<FieldLabel htmlFor='lastName'>Tên</FieldLabel>
										<Input
											id='lastName'
											type='lastName'
											required
											placeholder='A'
											{...register('lastName')}
										/>
										<p className='text-destructive text-sm'>{errors.lastName?.message}</p>
									</Field>
								</Field>
							</Field>
							<Field>
								<FieldLabel htmlFor='email'>Email</FieldLabel>
								<Input
									id='email'
									type='email'
									placeholder='may@gmail.com'
									required
									{...register('email')}
								/>
								<p className='text-destructive text-sm'>{errors.email?.message}</p>
							</Field>
							<Field>
								<Field>
									<FieldLabel htmlFor='password'>Mật khẩu</FieldLabel>
									<div className='relative'>
										<Input
											id='password'
											type={showPassword ? 'text' : 'password'}
											className='pr-10'
											placeholder='••••••••'
											required
											{...register('password')}
										/>
										<Button
											type='button'
											variant='ghost'
											size='icon'
											className='absolute right-0 top-0 h-full hover:bg-transparent text-muted-foreground hover:text-foreground'
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOff className='h-4 w-4' />
											) : (
												<Eye className='h-4 w-4' />
											)}
											<span className='sr-only'>
												{showPassword ? 'Hide password' : 'Show password'}
											</span>
										</Button>
									</div>
									<p className='text-destructive text-sm'>{errors.password?.message}</p>
								</Field>
								<Field>
									<FieldLabel htmlFor='confirm-password'>Xác nhận mật khẩu</FieldLabel>
									<div className='relative'>
										<Input
											id='confirm-password'
											type={showConfirmPassword ? 'text' : 'password'}
											className='pr-10'
											placeholder='••••••••'
											required
											{...register('confirmPassword')}
										/>
										<Button
											type='button'
											variant='ghost'
											size='icon'
											className='absolute right-0 top-0 h-full hover:bg-transparent text-muted-foreground hover:text-foreground'
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										>
											{showConfirmPassword ? (
												<EyeOff className='h-4 w-4' />
											) : (
												<Eye className='h-4 w-4' />
											)}
											<span className='sr-only'>
												{showConfirmPassword ? 'Hide password' : 'Show password'}
											</span>
										</Button>
									</div>
									<p className='text-destructive text-sm'>{errors.confirmPassword?.message}</p>
								</Field>
							</Field>
							<Field>
								<Button type='submit' disabled={isSubmitting}>
									{isSubmitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
								</Button>
							</Field>
							<FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
								Hoặc tiếp tục với
							</FieldSeparator>
							<Field>
								<GoogleAuthButton />
							</Field>
							<FieldDescription className='text-center'>
								Đã có tài khoản?{' '}
								<Link className='text-slate-600' to='/login'>
									Đăng nhập
								</Link>
							</FieldDescription>
						</FieldGroup>
					</form>
					<div className='bg-muted relative hidden md:block'>
						<img
							src='./auth/placeholderSignUp.png'
							alt='Hình ảnh'
							className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
						/>
					</div>
				</CardContent>
			</Card>
			<FieldDescription className='px-6 text-center'>
				Bằng cách nhấn tiếp tục, bạn đồng ý với <a href='#'>Điều khoản dịch vụ</a> và{' '}
				<a href='#'>Chính sách bảo mật</a>.
			</FieldDescription>
		</div>
	);
}
