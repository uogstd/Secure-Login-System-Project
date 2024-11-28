import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

const FooterCom = () => {
  return (
    <Footer container className="px-3 py-3 border border-t-8 border-green-500">
      <div className="w-full">
        <div className="grid grid-cols-3 justify-items-center items-center max-w-6xl mx-auto">
          <Link
            to="/"
            className="whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-red-500 to-red-400 rounded-lg text-blue-800">
              Secure Login System
            </span>{" "}
            Project
          </Link>

          <div className="text-center">
            <Footer.Title title="About" />
            <Footer.LinkGroup col>
              <Footer.Link href="https://www.github.com/uogstd" target="_blank">
                Final Year Project
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div className="text-center">
            <Footer.Title title="Follow Us" />
            <Footer.LinkGroup col>
              <Footer.Link href="https://www.github.com/uogstd" target="_blank">
                Github
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>

        <div className="w-full border-t border-gray-300 my-6" />

        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Footer.Copyright
            href="#"
            by="UOG Student"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="https://github.com/uogstd" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
