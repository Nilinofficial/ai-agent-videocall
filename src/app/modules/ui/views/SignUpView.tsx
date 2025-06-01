"use client";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth.client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters long" }),
    confirmPassword: z.string(),

    userName: z
      .string()
      .min(3, { message: "Username must be atleast 3 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setIsLoading(true);

    const { data: userData, error } = await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.userName,
      },
      {
        onSuccess: () => {
          router.push("/");
          setIsLoading(false);
        },
        onError: (error) => {
          setError(error.error.message);
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col  gap-6 ">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <div className="p-6 md:p-8">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">
                      Let&apos;s get started
                    </h1>
                    <p className="text-muted-foreground text-balance">
                      Create a new account
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Adam Joe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                      <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                      {error}
                    </Alert>
                  )}
                  <Button type="submit" className="w-full">
                    {isLoading ? (
                      <>
                        <p>Signing p</p>
                      </>
                    ) : (
                      <> Sign up</>
                    )}
                  </Button>

                  <div
                    className="after:border-border relative text-center text-sm after:absolute
                   after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t
                   "
                  >
                    <span className="bg-card text-muted-foreground relative  z-10 px-2">
                      Or continue with
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full cursor-pointer"
                    >
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full cursor-pointer"
                    >
                      Github
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    Already have an account ?{" "}
                    <Link
                      href="/sign-in"
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </Form>

          <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px ]" />
            <p className="text-2xl font-semibold text-white">Meet.AI</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-muted-foreground *:[a]:hover:text-primary  text-xs text-balance *:[a]:underline *[a]:underline-offset-4">
        By clicking continue you agree to our <a href="#">Terms of service</a>{" "}
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};

export default SignUpView;
