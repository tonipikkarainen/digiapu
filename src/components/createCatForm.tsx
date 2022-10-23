import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "../utils/trpc";

const FormSchema = z.object({
  name: z.string().min(1),
});
type FormSchemaType = z.infer<typeof FormSchema>;

type FormProps = {
  setShowModal: (a: boolean) => void;
  header: string;
  value: string;
};

const CreateCatForm = (props: FormProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const utils = trpc.useContext();
  const mutation = trpc.videoCategory.addCategory.useMutation({
    onSuccess({ name }) {
      console.log(name + "Created");
      utils.videoCategory.getAll.invalidate();
    },
    onError({ message }) {
      console.log(message);
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    //console.log("submit: " + data.name);
    await mutation.mutate({ name: data.name });
    props.setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Luo kategoria
      <input
        placeholder="Kategorian nimi"
        defaultValue={props.value}
        type="text"
        {...register("name")}
        disabled={isSubmitting}
        className={`mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-lg text-gray-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-0  disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400`}
      />
      {errors.name && (
        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-4 font-semibold uppercase text-white disabled:bg-gray-100 disabled:text-gray-400"
      >
        Luo kategoria
      </button>
      <button
        type="button"
        className="mt-2 w-full flex-1 rounded-md border p-2.5 text-gray-800 outline-none ring-indigo-600 ring-offset-2 focus:ring-2"
        onClick={() => props.setShowModal(false)}
      >
        Cancel
      </button>
    </form>
  );
};

export default CreateCatForm;
