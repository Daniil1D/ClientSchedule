import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import { Card } from "../../components/card"
import { CreateComment } from "../../components/create-comment"
import { GoBack } from "../../components/go-back"

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? "")

  if (!data) {
    return <h2>Поста не существует</h2>
  }

  const {
    content,
    id,
    authorId,
    comments,
    author,
    createdAt,
  } = data

  return (
    <>
      <GoBack />
      <Card
        cardFor="current-post"
        avatarUrl={author?.avatarUrl ?? ""}
        content={content}
        name={author?.name ?? ""}
        commentsCount={comments?.length}
        authorId={authorId}
        id={id}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <Card
              cardFor="comment"
              key={comment.id}
              avatarUrl={comment.user.avatarUrl ?? ""}
              content={comment.content}
              name={comment.user.name ?? ""}
              authorId={comment.userId}
              commentId={comment.id}
              id={id}
            />
          ))
        ) : (
          <p>No comments found for this post.</p>
        )}
      </div>
    </>
  )
}
