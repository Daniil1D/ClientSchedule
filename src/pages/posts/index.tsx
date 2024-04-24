import { Card } from "../../components/card"
import { CreatePost } from "../../components/create-post"
import { useGetAllPostsQuery } from "../../app/services/postsApi"

export const Posts = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full flex">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              
              createdAt,
            }) => (
              <Card
                key={id}
                avatarUrl={author.avatarUrl ?? ""}
                content={content}
                name={author.name ?? ""}
               
                commentsCount={comments.length}
                authorId={authorId}
                id={id}
             
                createdAt={createdAt}
                cardFor="post"
              />
            ),
          )
        : null}
    </>
  )
}
