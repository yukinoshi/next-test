import { NotAccountType } from "@/type/global";
import { useState } from "react";
import { z } from "zod";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from '@/components/ui/input'
import { Button } from "./ui/button";
import { registerAction } from "@/action/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters.' }),
})

function Register({ setIsNotAccountType }: { setIsNotAccountType: React.Dispatch<React.SetStateAction<NotAccountType>> }) {
    const [fieldErrors, setFieldErrors] = useState<{ email?: string[]; name?: string[]; password?: string[] }>({});
    const router = useRouter();
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const values = {
            email: String(formData.get("email") ?? ""),
            name: String(formData.get("name") ?? ""),
            password: String(formData.get("password") ?? ""),
        };

        const result = formSchema.safeParse(values);
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            setFieldErrors(errors);
            console.log(errors);
            return;
        }

        setFieldErrors({});
        const toastId = toast.loading("Loading...", {
            style: {
                borderRadius: "8px",
                background: "#334155",
                color: "#fff",
            },
        });

        try {
            const res = await registerAction(result.data.email, result.data.name, result.data.password);
            if (res.status !== 200) {
                throw new Error(res.body);
            }
            toast.success(res.body, {
                id: toastId,
                style: {
                    borderRadius: "8px",
                    background: "#16a34a", // 绿色
                    color: "#fff",
                },
            });
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "registration failed", {
                id: toastId,
                style: {
                    borderRadius: "8px",
                    background: "#dc2626", // 红色
                    color: "#fff",
                },
            });
        }
    }
    return (
        <div className="container2 my-20">
            <h1 className="text-xl mb-3 text-center font-bold">Create an account</h1>
            <p className="text-center mb-6">
                Sign up to access an enhanced shopping experience.
            </p>
            <form className="space-y-8" onSubmit={onSubmit}>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="Email">Email</FieldLabel>
                            <Input id="Email" name="email" type="email" placeholder="Please enter your email" />
                            <FieldError errors={fieldErrors.email?.map((message) => ({ message }))} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="Name">Name</FieldLabel>
                            <Input id="Name" name="name" type="text" placeholder="Please enter your name" />
                            <FieldError errors={fieldErrors.name?.map((message) => ({ message }))} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" name="password" type="password" placeholder="Please enter your password" />
                            <FieldError errors={fieldErrors.password?.map((message) => ({ message }))} />
                        </Field>
                    </FieldGroup>
                    <Field>
                        <Button type="submit">Sign up</Button>
                    </Field>
                </FieldSet>
            </form>
            <p className="text-center text-sm mt-3">Already a member? <span className="underline text-orange-400 cursor-pointer" onClick={() => setIsNotAccountType('login')}>Sign in.</span></p>
        </div>
    );
}

export default Register;