import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className='overflow-hidden p-0'>
				<CardContent className='grid p-0 md:grid-cols-2'>
					<form className='p-6 md:p-8'>
						<FieldGroup>
							<div className='flex flex-col items-center gap-2 text-center'>
								<h1 className='text-2xl font-bold'>Tạo tài khoản</h1>
								<p className='text-muted-foreground text-sm text-balance'>
									Chào mừng bạn! Hãy đăng ký để bắt đầu!
								</p>
							</div>
							<Field>
								<Field className='grid grid-cols-2 gap-4'>
									<Field>
										<FieldLabel htmlFor='firstName'>Họ</FieldLabel>
										<Input id='firstName' type='firstName' required />
									</Field>
									<Field>
										<FieldLabel htmlFor='lastName'>Tên</FieldLabel>
										<Input id='lastName' type='lastName' required />
									</Field>
								</Field>
							</Field>
							<Field>
								<FieldLabel htmlFor='email'>Email</FieldLabel>
								<Input id='email' type='email' placeholder='may@gmail.com' required />
							</Field>
							<Field>
								<Field className='grid grid-cols-2 gap-4'>
									<Field>
										<FieldLabel htmlFor='password'>Mật khẩu</FieldLabel>
										<div className='relative'>
											<Input
												id='password'
												type={showPassword ? 'text' : 'password'}
												className='pr-10'
												required
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
									</Field>
									<Field>
										<FieldLabel htmlFor='confirm-password'>Xác nhận mật khẩu</FieldLabel>
										<div className='relative'>
											<Input
												id='confirm-password'
												type={showConfirmPassword ? 'text' : 'password'}
												className='pr-10'
												required
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
									</Field>
								</Field>
							</Field>
							<Field>
								<Button type='submit'>Tạo tài khoản</Button>
							</Field>
							<FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
								Hoặc tiếp tục với
							</FieldSeparator>
							<Field>
								<Button
									variant='outline'
									className='group w-full h-full transition-all duration-300 overflow-visible rounded-md group hover:bg-accent-foreground'
								>
									<div className='w-full flex h-full overflow-hidden rounded-md hover:shadow-none duration-300'>
										<div className='w-full h-full text-sm gap-x-0.5 gap-y-0.5 justify-center text-[#101010] duration-200 items-center font-medium gap-4 inline-flex overflow-hidden rounded-md black group-hover:text-primary'>
											<svg
												xmlnsXlink='http://www.w3.org/1999/xlink'
												xmlns='http://www.w3.org/2000/svg'
												version='1.1'
												viewBox='0 0 64 64'
												height='32px'
												width='24px'
											>
												<g fillRule='evenodd' fill='none' strokeWidth={1} stroke='none'>
													<g fillRule='nonzero' transform='translate(3.000000, 2.000000)'>
														<path
															fill='#4285F4'
															d='M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267'
														/>
														<path
															fill='#34A853'
															d='M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667'
														/>
														<path
															fill='#FBBC05'
															d='M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782'
														/>
														<path
															fill='#EB4335'
															d='M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769'
														/>
													</g>
												</g>
											</svg>
											<span className='ml-2'>Đăng nhập bằng Google</span>
										</div>
									</div>
								</Button>
							</Field>
							<FieldDescription className='text-center'>
								Đã có tài khoản? <a href='#'>Đăng nhập</a>
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
