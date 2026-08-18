"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateProductSchema,
  createProductSchema,
} from "@/schema/create-product-schema";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { createProductAction } from "@/server/create-product-action";
import { Plus } from "lucide-react";

export function CreateProductDialog() {
  const router = useRouter();
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  async function onSubmit(data: CreateProductSchema) {
    try {
      const response = await createProductAction(data);

      if (response?.error) {
        toast.add({
          title: "Error",
          description: response.error,
        });
      } else {
        toast.add({
          title: "Success",
          description: "Product created successfully",
        });
        router.refresh();
        form.reset();
      }
    } catch (error) {
      toast.add({
        title: "Error",
        description: (error as Error).message,
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-8 h-8 rounded-full">
          <Plus className="size-5 " />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Enter the product information below to create a new product.
          </DialogDescription>
        </DialogHeader>

        <form id="create-product-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-name">Product Name</FieldLabel>

                  <Input
                    {...field}
                    id="product-name"
                    placeholder="Enter product name"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-description">
                    Description
                  </FieldLabel>

                  <Textarea
                    {...field}
                    id="product-description"
                    placeholder="Enter product description"
                    aria-invalid={fieldState.invalid}
                    rows={4}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Price */}
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-price">Price</FieldLabel>

                  <Input
                    {...field}
                    id="product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    aria-invalid={fieldState.invalid}
                    onChange={(event) => field.onChange(event.target.value)}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button
            type="submit"
            form="create-product-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
