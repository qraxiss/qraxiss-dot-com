// Import Dependencies
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, Resolver, useForm } from "react-hook-form";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import type { DeltaStatic } from "@/components/shared/form/TextEditor";
import { useEffect, useState } from "react";

// Local Imports
import { schema, type SchemaType } from "./schema";
import { Page } from "@/components/shared/Page";
import { Button, Card, Input, Textarea } from "@/components/ui";
import { TextEditor } from "@/components/shared/form/TextEditor";
import { CoverImageUpload } from "./components/CoverImageUpload";
import { Tags } from "./components/Tags";
import { ContextualHelp } from "@/components/shared/ContextualHelp";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Listbox } from "@/components/shared/form/StyledListbox";
import { Combobox } from "@/components/shared/form/StyledCombobox";

// ----------------------------------------------------------------------

// SSR-safe Delta initialization
const createDelta = (): DeltaStatic => {
  // Return a valid Delta-like object
  return { ops: [] };
};

const getInitialState = () => ({
  title: "",
  caption: "",
  content: createDelta(),
  cover: "",
  category_id: "",
  author_id: "",
  tags: [],
  publish_date: null,
  meta: {
    title: "",
    description: "",
    keywords: [],
  },
});

const editorModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }, "image"],
    ["clean"], // remove formatting button
  ],
};

const categories = [
  {
    id: "1",
    label: "Accessories",
  },
  {
    id: "2",
    label: "Digital",
  },
  {
    id: "3",
    label: "Home",
  },
  {
    id: "4",
    label: "Technology",
  },
];

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const NewPostFrom = () => {
  const [isClient, setIsClient] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch,
  } = useForm<SchemaType>({
    resolver: yupResolver(schema) as Resolver<SchemaType>,
    defaultValues: getInitialState() as unknown as SchemaType,
  });

  const content = watch('content');

  // Client-side hydration sonrası Delta'yı initialize et
  useEffect(() => {
    setIsClient(true);
    // Eğer content boş ise (SSR'dan geliyorsa) yeni Delta oluştur
    if (!content || Object.keys(content).length === 0) {
      setValue('content', createDelta() as any);
    }
  }, [setValue]);

  const onSubmit = (data: any) => {
    console.log(data);
    toast("New Post Published. Now you can add new one", {
      invert: true,
    });
    reset();
  };

  return (
    <Page title="New Post Form">
      <div className="transition-content px-(--margin-x) pb-6">
        <div className="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6">
          <div className="flex items-center gap-1">
            <DocumentPlusIcon className="size-6" />
            <h2 className="dark:text-dark-50 line-clamp-1 text-xl font-medium text-gray-700">
              New Post
            </h2>
          </div>
          <div className="flex gap-2">
            <Button className="min-w-[7rem]" variant="outlined">
              Preview
            </Button>
            <Button
              className="min-w-[7rem]"
              color="primary"
              type="submit"
              form="new-post-form"
            >
              Save
            </Button>
          </div>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          id="new-post-form"
        >
          <div className="grid grid-cols-12 place-content-start gap-4 sm:gap-5 lg:gap-6">
            <div className="col-span-12 lg:col-span-8">
              <Card className="p-4 sm:px-5">
                <h3 className="dark:text-dark-100 text-base font-medium text-gray-800">
                  General
                </h3>
                <div className="mt-5 space-y-5">
                  <Input
                    label="Title"
                    placeholder="Enter the post title"
                    {...register("title")}
                    error={errors?.title?.message}
                  />

                  <Input
                    label="Caption"
                    placeholder="Enter the post caption"
                    {...register("caption")}
                    error={errors?.caption?.message}
                  />

                  <div className="flex flex-col">
                    <span>Description</span>
                    <Controller
                      control={control}
                      name="content"
                      render={({ field: { value, onChange, ...rest } }) => (
                        <TextEditor
                          value={(isClient && value) ? value as DeltaStatic : createDelta()}
                          onChange={(val) => onChange(val)}
                          placeholder="Enter your content..."
                          className="mt-1.5 [&_.ql-editor]:max-h-80 [&_.ql-editor]:min-h-[12rem]"
                          modules={editorModules}
                          error={errors?.content?.message}
                          {...rest}
                        />
                      )}
                    />
                  </div>

                  <Controller
                    render={({ field: { onChange, value, ...rest } }) => (
                      <CoverImageUpload
                        classNames={{
                          box: "mt-1.5",
                        }}
                        label="Cover Image"
                        error={errors?.cover?.message}
                        value={value as File}
                        onChange={onChange}
                        {...rest}
                      />
                    )}
                    name="cover"
                    control={control}
                  />
                </div>
              </Card>
            </div>
            <div className="col-span-12 space-y-4 sm:space-y-5 lg:col-span-4 lg:space-y-6">
              <Card className="space-y-5 p-4 sm:px-5">
                <Controller
                  render={({ field }) => (
                    <Listbox
                      data={categories}
                      value={
                        categories.find((cat) => cat.id === field.value) || null
                      }
                      onChange={(val) => field.onChange(val.id)}
                      name={field.name}
                      label="Category"
                      placeholder="Select Category"
                      displayField="label"
                      error={errors?.category_id?.message}
                    />
                  )}
                  control={control}
                  name="category_id"
                />

                <Controller
                  render={({ field: { value, onChange, ...rest } }) => (
                    <Combobox
                      data={people}
                      displayField="name"
                      value={
                        people.find(
                          (user) => String(user.id) === String(value),
                        ) || null
                      }
                      onChange={(val: any) => onChange(val?.id)}
                      placeholder="Please Select Author"
                      label="Select Author"
                      searchFields={["name"]}
                      error={errors?.author_id?.message}
                      highlight
                      {...rest}
                    />
                  )}
                  control={control}
                  name="author_id"
                />

                <Controller
                  render={({ field: { value, onChange, ...rest } }) => (
                    <Tags
                      value={
                        value?.map((val, i) => {
                          return { id: String(i), value: String(val) };
                        }) || []
                      }
                      placeholder="Enter Tags"
                      onChange={(val) => onChange(val.map((i) => i.value))}
                      error={errors?.tags?.message}
                      label="Tags"
                      {...rest}
                    />
                  )}
                  control={control}
                  name="tags"
                />

                <Controller
                  render={({ field: { onChange, value, ...rest } }) => (
                    <DatePicker
                      onChange={onChange}
                      value={value || ""}
                      label="Publish Date"
                      error={errors?.publish_date?.message}
                      options={{ disableMobile: true }}
                      placeholder="Choose date..."
                      {...rest}
                    />
                  )}
                  control={control}
                  name="publish_date"
                />
              </Card>

              <Card className="p-4 sm:px-5">
                <h6 className="dark:text-dark-100 flex space-x-1.5 text-base font-medium text-gray-800">
                  <span>SEO Meta Data</span>
                  <ContextualHelp
                    title="SEO Meta Data"
                    anchor={{ to: "bottom", gap: 8 }}
                    content={
                      <p>
                        SEO data is relevant information that your company needs
                        to be aware of so that your business can take full
                        advantage of all the opportunities presented with this
                        type of strategy.
                      </p>
                    }
                  />
                </h6>

                <div className="mt-3 space-y-5">
                  <Input
                    {...register("meta.title")}
                    label="Meta title"
                    error={errors?.meta?.title?.message}
                    placeholder="Enter Meta Title"
                  />
                  <Textarea
                    rows={4}
                    {...register("meta.description")}
                    label="Meta Description"
                    error={errors?.meta?.description?.message}
                    placeholder="Enter Meta Description"
                  />
                  <Controller
                    render={({ field }) => (
                      <Tags
                        placeholder="Enter Meta Keywords"
                        label="Meta Keywords"
                        value={
                          field.value?.map((val, i) => {
                            return { id: String(i), value: String(val) };
                          }) || []
                        }
                        onChange={(val) =>
                          field.onChange(val.map((i) => i.value))
                        }
                        error={errors?.meta?.keywords?.message}
                      />
                    )}
                    control={control}
                    name="meta.keywords"
                  />
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default NewPostFrom;