import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { useState } from "react"
import { Login } from "../../features/user/login"
import { Register } from "../../features/user/register"


export const Auth2 = () => {
  const [selected, setSelected] = useState("login")


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[600px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as string)}
            >

              <Tab key="sign-up" title="Регистрация">
                <Register setSelected={setSelected} />
              </Tab> 
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}