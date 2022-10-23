import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";

const FormSchema = z.object({
  name: z.string().min(1),
  id: z.string().min(1),
  url: z.string().min(1),
});

type FormSchemaType = z.infer<typeof FormSchema>;

type FormProps = {
  setShowModal: (a: boolean) => void;
  header: string;
  value: string;
};

const CreateVideoForm = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const { data: sessionData } = useSession();
  const { data, isLoading } = trpc.subCategory.getAll.useQuery();
  const utils = trpc.useContext();
  const mutation = trpc.video.addVideo.useMutation({
    onSuccess({ name }) {
      console.log(name + "Created");
      utils.video.getAll.invalidate();
    },
    onError({ message }) {
      console.log(message);
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log("submit: " + data.name);
    if (sessionData?.user?.id) {
      await mutation.mutate({
        name: data.name,
        categoryId: data.id,
        url: data.url,
        userId: sessionData?.user?.id,
      });
    }
    props.setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Luo alikategoria
      <input
        placeholder="Videon nimi"
        defaultValue={props.value}
        type="text"
        {...register("name")}
        disabled={isSubmitting}
        className={`mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-lg text-gray-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-0  disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400`}
      />
      {errors.name && (
        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
      )}
      <input
        placeholder="url"
        defaultValue={props.value}
        type="text"
        {...register("url")}
        disabled={isSubmitting}
        className={`mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-lg text-gray-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-0  disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400`}
      />
      {errors.url && (
        <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
      )}
      <select
        className="rounded-xl border-2 p-3"
        id="categories"
        {...register("id")}
      >
        {data?.map((videocat) => (
          <option key={videocat.id} value={videocat.id}>
            {videocat.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-4 font-semibold uppercase text-white disabled:bg-gray-100 disabled:text-gray-400"
      >
        Luo video
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

export default CreateVideoForm;
