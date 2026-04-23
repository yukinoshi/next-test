"use client"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { z } from "zod";
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@base-ui/react";
import { toast } from "sonner";
import { addAddressAction, deleteAddressAction } from "@/action/address";
import { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { Address as AddressType } from '@/type/global'


const formSchema = z.object({
    name: z.string().min(1, { message: 'Name cannot be empty' }),
    city: z.string().min(1, { message: 'City cannot be empty' }),
    address: z.string().min(1, { message: 'Address cannot be empty' }),
    phone: z.string().min(1, { message: 'Phone cannot be empty' }),
})

function Address({ authData, addressData }: { authData: JwtPayload; addressData: AddressType[] }) {
    const [open, setOpen] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<{ name?: string[]; city?: string[]; address?: string[]; phone?: string[] }>({});
    const router = useRouter()
    const handleClick = async (id: number) => {
        await deleteAddressAction(id)
        router.refresh()
    }
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formElement = event.currentTarget;
        const formData = new FormData(formElement);
        const values = {
            name: String(formData.get("name") ?? ""),
            city: String(formData.get("city") ?? ""),
            address: String(formData.get("address") ?? ""),
            phone: String(formData.get("phone") ?? ""),
        };

        const result = formSchema.safeParse(values);
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            setFieldErrors(errors);
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
            const res = await addAddressAction(result.data.name, result.data.city, result.data.address, result.data.phone, authData.userid);
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
            setOpen(false);
            //清空表单
            formElement.reset();
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "login failed", {
                id: toastId,
                style: {
                    borderRadius: "8px",
                    background: "#dc2626", // 红色
                    color: "#fff",
                },
            });
            console.log(error);
        }
    }
    return (<div className="grid grid-cols-2 gap-4 mt-6 mb-4">
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>
                <div className="border rounded-sm h-40 cursor-pointer relative text-slate-600">
                    <p className="m-3">New address</p>
                    <div className="absolute bottom-2 left-3">
                        <Plus width={14} />
                    </div>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="mb-5">Add address</AlertDialogTitle>
                    <form className="space-y-8 w-full" onSubmit={onSubmit}>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">name</FieldLabel>
                                    <Input id="name" name="name" type="text" placeholder="Please enter your name" />
                                    <FieldError errors={fieldErrors.name?.map((message) => ({ message }))} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="city">City</FieldLabel>
                                    <Input id="city" name="city" type="text" placeholder="Please enter your city" />
                                    <FieldError errors={fieldErrors.city?.map((message) => ({ message }))} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="address">Address</FieldLabel>
                                    <Input id="address" name="address" type="text" placeholder="Please enter your address" />
                                    <FieldError errors={fieldErrors.address?.map((message) => ({ message }))} />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                                    <Input id="phone" name="phone" type="text" placeholder="Please enter your phone number" />
                                    <FieldError errors={fieldErrors.phone?.map((message) => ({ message }))} />
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button type="submit">Save</Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
        {addressData.map(item => (
            <div key={item.id} className="border rounded-sm h-40 relative text-slate-600">
                <p className="m-3">{item.name}</p>
                <div className="text-sm ml-5">
                    <p>{item.city}</p>
                    <p>{item.address}</p>
                    <p>{item.phone}</p>
                </div>
                <div className="absolute bottom-2 left-3 flex text-xs gap-2">
                    <div className="flex items-center cursor-pointer"><Edit width={14} /> Edit</div>
                    <div className="flex items-center cursor-pointer" onClick={() => handleClick(item.id)}><Trash2 width={14} /> Remove</div>
                </div>
            </div>
        ))}
    </div>);
}

export default Address;