import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "../utils/trpc";
import { UseTRPCMutationResult } from "@trpc/react/shared";

const FormSchema = z.object({});
type FormSchemaType = z.infer<typeof FormSchema>;

type FormProps = {
  setShowModal: (a: boolean) => void;
  id: string;
  del: (id: string) => void;
};

const DeleteForm = (props: FormProps) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async () => {
    await props.del(props.id);
    props.setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Haluatko varmasti suorittaa poiston?
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-4 font-semibold uppercase text-white disabled:bg-gray-100 disabled:text-gray-400"
      >
        Kyllä
      </button>
      <button
        type="button"
        className="mt-2 w-full flex-1 rounded-md border p-2.5 text-gray-800 outline-none ring-indigo-600 ring-offset-2 focus:ring-2"
        onClick={() => props.setShowModal(false)}
      >
        Ei
      </button>
    </form>
  );
};

export default DeleteForm;
