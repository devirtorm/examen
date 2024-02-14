import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

function PersistentButton() {
  return (
    <div>
      <a
        href="https://wa.me/523112881665"
        className="fixed bottom-4 right-4 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
      >
        WhatsApp
      </a>
    </div>
  );
}

export default PersistentButton;
