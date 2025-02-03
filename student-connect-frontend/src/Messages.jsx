import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const Messages = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full w-full  rounded-lg border absolute inset-0"
    >
      <ResizablePanel defaultSize={25}>
        <ScrollArea>
          <div className="flex flex-col h-full items-center  p-6">
            <span className="font-light text-2xl font-mono border-b border-3 border-slate-300 ">
              Messages
            </span>
            <Button className="w-full h-[60px] mt-4 px-1" variant="outline">
              <Avatar className="mr-2 ">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="">shad</div>
            </Button>
            <Separator className="my-2" />
          </div>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={75}>
        <div className="grid grid-rows-3 gap-2 h-full">
          <div className="row-span-2 bg-red-400 text-white">Text area</div>
          <div className="row-span-1 grid w-full ">
            <div className="grid grid-flow-row w-full"></div>
            <div className="grid w-full gap-3">
              <Textarea placeholder="Type your message here." />
              <Button>Send message</Button>
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default Messages;
