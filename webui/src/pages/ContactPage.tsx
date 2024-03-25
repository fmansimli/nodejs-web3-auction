import { useRef, useState } from "react";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

import MyButton from "../components/ui/MyButton";
import MyCard from "../components/ui/MyCard";
import MyInput from "../components/ui/MyInput";
import MyTextArea from "../components/ui/MyTextArea";
import MyDialog from "../components/MyDialog";

import { toast } from "react-toastify";

const ContactPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function submitHanlder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const values = Object.fromEntries<any>(formdata);

    try {
      const lengthOfFullname = values?.fullname.trim().length;
      const _errors: string[] = [];

      if (lengthOfFullname < 5 || lengthOfFullname > 20) {
        const msg = "Lenght of fullname should be between 5 and 20.";
        _errors.push(msg);
      }

      const lengthOfMessage = values?.message.trim().length;

      if (lengthOfMessage < 10) {
        const msg = "Lenght of message should be greater than 10";
        _errors.push(msg);
      }

      const pattern = /[\w]{2,}@[A-Za-z0-9]{3,}\.[A-Za-z]{2,}/;
      if (!pattern.test(values.email || "")) {
        const msg = "Invalid email address.";
        _errors.push(msg);
      }

      if (_errors.length > 0) {
        setErrors(_errors);
        return;
      }

      setProcessing(true);
      await new Promise((resolve, _reject) => {
        setTimeout(() => resolve({}), 200);
      });

      formRef.current?.reset();

      toast("success!", { type: "success", position: "top-center" });
    } catch (error: any) {
      toast(error.message, { type: "error", position: "top-center" });
    }
    setProcessing(false);
  }

  return (
    <div className="flex w-full flex-1">
      <div className="container my-10 flex flex-1">
        <div className="flex flex-col items-center justify-between gap-16 text-gray-700 dark:text-white lg:flex-row">
          <div className="flex flex-1 flex-col gap-5">
            <h1 className="text-3xl">Have a question?</h1>
            <div className="text-md leading-7 tracking-tight">
              Drop us a message! We value your inquiries and will get back to you promptly.
              Simply fill out the form below, and we'll be in touch soon.
            </div>
            <div className="my-5">
              <form onSubmit={submitHanlder} ref={formRef}>
                <div className="flex flex-col gap-6">
                  <MyInput
                    name="fullname"
                    id="fullname"
                    placeholder="full name"
                    label="Full Name"
                  />
                  <MyInput name="email" id="email" label="Email" placeholder="email" />
                  <MyTextArea
                    name="message"
                    id="message"
                    label="Message"
                    placeholder="message"
                  />
                  <div className="my-1">
                    <MyButton type="submit" disabled={processing}>
                      {processing ? "processing..." : "SEND MESSAGE"}
                    </MyButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex-1">
            <MyCard>
              <div className="flex w-full flex-col gap-5 p-8">
                <h5 className="text-xl font-bold">Get in touch</h5>
                <div className="text-md mb-3 leading-7 tracking-tight">
                  Whether it's a question, feedback, or collaboration opportunity Reach out via
                  email, phone, or Linkedin.
                </div>

                <div className="flex items-center gap-5">
                  <MapPinIcon className="h-7 w-7 text-blue-400" />
                  <div className="">
                    <div className="text-md mb-1">Address</div>
                    <address>266 Palmerston Ave., Toronto, ON</address>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <PhoneIcon className="h-7 w-7 text-blue-400" />
                  <div className="">
                    <div className="text-md mb-1">Phone</div>
                    <a href="tel:+14378799971">+14378799971</a>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <EnvelopeIcon className="h-7 w-7 text-blue-400" />
                  <div className="">
                    <div className="text-md mb-1">Email</div>
                    <a href="mailto:faridmansimli@gmail.com">faridmansimli@gmail.com</a>
                  </div>
                </div>
              </div>
            </MyCard>
          </div>
        </div>
      </div>
      <MyDialog
        open={errors.length > 0}
        title="Attention!"
        hasLeftButton={false}
        rightButtonText="close"
        hasRightButton
        onRightButtonClick={() => setErrors([])}
        onLeftButtonClick={() => null}>
        <div className="my-5 flex h-full w-full items-center justify-center">
          <ul className="text-black dark:text-white">
            {errors.map((err, key) => (
              <li key={key}>{err}</li>
            ))}
          </ul>
        </div>
      </MyDialog>
    </div>
  );
};

export default ContactPage;
