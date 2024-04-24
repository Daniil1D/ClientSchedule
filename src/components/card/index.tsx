import {
    Card as NextUiCard,
    CardHeader,
    CardBody,
    CardFooter,
  } from "@nextui-org/react"
  import { MetaInfo } from "../meta-info"
  import { Typography } from "../typography"
  import { User } from "../user"
  import { Link, useNavigate } from "react-router-dom"
  import { FaRegComment } from "react-icons/fa6"
  import { formatToClientDate } from "../../utils/format-to-client-date"
  import { useDeletePostMutation, useLazyGetPostByIdQuery, useLazyGetAllPostsQuery } from "../../app/services/postsApi"
  import { RiDeleteBinLine } from "react-icons/ri"
  import { useSelector } from "react-redux"
  import { selectCurrent } from "../../features/user/userSlice"
  import { useDeleteCommentMutation } from "../../app/services/commentsApi"
  import { Spinner } from "@nextui-org/react"
  import { ErrorMessage } from "../error-message"
  import { useState } from "react"
  import { hasErrorField } from "../../utils/has-error-field"
  
  type Props = {
    avatarUrl: string
    name: string
    authorId: string
    content: string
    commentId?: string
    commentsCount?: number
    createdAt?: Date
    id?: string
    cardFor: "comment" | "post" | "current-post"
  }
  
  export const Card = ({
    avatarUrl = "",
    name = "",
    content = "",
    authorId = "",
    id = "",
    commentsCount = 0,
    cardFor = "post",
    createdAt,
    commentId = "",
  }: Props) => {
    const [deletePost, deletePostStatus] = useDeletePostMutation()
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrent)
  
    const refetchPosts = async () => {
      switch (cardFor) {
        case "post":
          await triggerGetAllPosts().unwrap()
          break
        case "current-post":
          await triggerGetAllPosts().unwrap()
          break
        case "comment":
          await triggerGetPostById(id).unwrap()
          break
        default:
          throw new Error("Неверный аргумент cardFor")
      }
    }
  
    const handleDelete = async () => {
      try {
        switch (cardFor) {
          case "post":
            await deletePost(id).unwrap()
            await refetchPosts()
            break
          case "current-post":
            await deletePost(id).unwrap()
            navigate('/')
            break
          case "comment":
            await deleteComment(commentId).unwrap()
            await refetchPosts()
            break
          default:
            throw new Error("Неверный аргумент cardFor")
        }
      } catch (err) {
        console.log(err)
        if (hasErrorField(err)) {
          setError(err.data.error)
        } else {
          setError(err as string)
        }
      }
    }
  
    return (
      <NextUiCard className="mb-5">
        <CardHeader className="justify-between items-center bg-transparent">
          <Link to={`/users/${authorId}`}>
            <User
              name={name}
              className="text-small font-semibold leading-none text-default-600"
              avatarUrl={avatarUrl}
              description={createdAt && formatToClientDate(createdAt)}
            />
          </Link>
          {authorId === currentUser?.id && (
            <div className="cursor-pointer" onClick={handleDelete}>
              {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                <Spinner />
              ) : (
                <RiDeleteBinLine />
              )}
            </div>
          )}
        </CardHeader>
        <CardBody className="px-3 py-2 mb-5">
          <Typography>{content}</Typography>
        </CardBody>
        {cardFor !== "comment" && (
          <CardFooter className="gap-3">
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
            <ErrorMessage error={error} />
          </CardFooter>
        )}
      </NextUiCard>
    )
  }
  