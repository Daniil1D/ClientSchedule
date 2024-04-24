import { Button, Textarea } from "@nextui-org/react"
import { IoMdCreate } from "react-icons/io"
import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from "../../components/error-message"
import { useCreateCommentMutation } from "../../app/services/commentsApi"
import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>()
  const [createComment] = useCreateCommentMutation()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap()
        setValue("comment", "")
      }
    } catch (error) {
      console.log("err", error)
    }
  })

  const error = errors?.comment?.message as string

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{
          required: "Поле обязательно",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Напишите свой ответ"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="primary"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Ответить
      </Button>
    </form>
  )
}
