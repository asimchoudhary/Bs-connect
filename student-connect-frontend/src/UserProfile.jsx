import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEmailContext } from "./EmailProvider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

const UserProfile = () => {
  const userEmail = localStorage.getItem("userEmail");
  const handleClick = async () => {
    const response = await fetch("http://localhost:5000/sendFirstMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderEmail: userEmail,
        receiverEmail: user.email,
        message: message,
      }),
    });
    console.log(response.status);
    if (response.status === 200) {
      alert(
        `Message sent successfully to ${user.name}. Now you can go to Message window in the dashboard to see your messages  `
      );
    } else {
      alert("Message not sent");
    }
  };

  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const [receiverEmail, setReceiverEmail] = useState("till no user assigned");
  const { userId } = useParams();

  async function fetchUserDetails() {
    const response = await fetch("http://localhost:5000/getUserDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
      }),
    });
    const data = await response.json();
    setUser(data);
    setReceiverEmail(data.email);
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div>
      <div className="flex bg-gray-100 min-h-screen p-12">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="absolute top-0 right-0 m-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
              variant="outline"
            >
              <FaCommentDots className="mr-2" /> Chat
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Message to {user.name}</SheetTitle>
            </SheetHeader>
            <Textarea
              className="mt-4"
              placeholder="Type your message here."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  className="mt-1"
                  type="submit"
                  onClick={(e) => {
                    handleClick();
                  }}
                >
                  Send
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className="w-1/2">
          <img
            src={user.image}
            alt="User"
            className="w-72 h-72   object-cover rounded-full shadow-lg mb-8"
          />
        </div>
        <div className="w-1/2 p-4 bg-white rounded shadow ml-6">
          <h2 className="text-4xl font-bold mb-6 font-serif text-black">
            {user.name}
          </h2>
          <p className="mb-2">
            <strong>City:</strong> {user.city}
          </p>
          <p className="mb-2">
            <strong>State:</strong> {user.state}
          </p>
          <p className="mb-2">
            <strong>Courses:</strong> {user.courses}
          </p>
          <p className="mb-2 font-mono text-black">
            <strong>Bio: </strong> {user.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
