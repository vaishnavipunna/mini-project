import { FaHeart } from "react-icons/fa";

const FooterCopyright = () => {
  return (
    <div className="ui-container text-xs mt-12">
      <div className="py-6 border-t border-dark-light flex flex-col sm:flex-row items-center justify-between gap-6">
        <p>Copyright &copy;{new Date().getFullYear()} All Rights Reserved.</p>

        <p className="flex items-center gap-1">
          <span>Made with</span>
          <FaHeart />
          <span>by Vaishnavi Punna</span>
        </p>
      </div>
    </div>
  );
};

export default FooterCopyright;
