import { utils } from "near-api-js";
import { useState, useEffect, useContext } from "react";
import Form from "@/components/Form";
import SignIn from "@/components/signIn";
import Messages from "@/components/Messages";
import { NearContext } from "@/context";
import { GuestbookNearContract } from "@/config";

export default function Home() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getLast10Messages().then((messages) => setMessages(messages.reverse()));
  }, []);

  const getLast10Messages = async () => {
    const total_messages = await wallet.viewMethod({
      contractId: GuestbookNearContract,
      method: "total_messages",
    });
    const from_index = total_messages >= 10 ? total_messages - 10 : 0;
    return wallet.viewMethod({
      contractId: GuestbookNearContract,
      method: "get_messages",
      args: { from_index: String(from_index), limit: "10" },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { fieldset, message, donation } = e.target.elements;
    fieldset.disabled = true;
    const deposit = BigInt(1);
    await wallet.callMethod({
      contractId: GuestbookNearContract,
      method: "add_message",
      args: { text: message.value },
      deposit,
    });
    const messages = await getLast10Messages();
    setMessages(messages.reverse());
    message.value = "";
    donation.value = "0";
    fieldset.disabled = false;
    message.focus();
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center mb-6">Incident Reporter</h1>
        {signedAccountId ? (
          <Form onSubmit={onSubmit} currentAccountId={signedAccountId} />
        ) : (
          <SignIn />
        )}
      </div>
      {!!messages.length && <Messages messages={messages} />}
    </main>
  );
}