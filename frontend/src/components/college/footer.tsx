import "./FooterStyles.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div>
          <h1> Centurion University of Technology and Management</h1>
          <p> Shaping Lives.. Empowering Communities..</p>
        </div>

        <div className="flex items-center">
          <a href="#">
            <i className="fab">
              <FaFacebookSquare />
            </i>
          </a>

          <a href="#">
            <i className="fab">
              <FaInstagramSquare />
            </i>
          </a>

          <a href="#">
            <i className="fab">
              <FaYoutubeSquare />
            </i>
          </a>

          <a href="#">
            <i className="fab">
              <FaTwitterSquare />
            </i>
          </a>
        </div>
      </div>

      <div className="bottom">
        <div>
          <h5>General</h5>
          <a href="#"> Holiday List</a>
          <a href="#"> Track Your Vehicle</a>
          <a href="#"> MIS/ERP Login</a>
          <a href="#"> Student Verification</a>
          <a href="#"> Site Map</a>
          <a href="#"> CUTM Timesheet APK</a>
          <a href="#"> CUTM Courseware APK</a>
        </div>

        <div>
          <h5>Admission </h5>
          <a href="#"> Admission</a>
          <a href="#"> How To Apply</a>
          <a href="#"> Course Fee</a>
          <a href="#"> Scholarship</a>
          <a href="#"> Refund Policy</a>
          <a href="#"> Lateral Entry</a>
        </div>

        <div>
          <h5>Placement</h5>
          <a href="#"> Overview</a>
          <a href="#"> Industry and Institutional Linkge</a>
          <a href="#"> Our Recruiters</a>
          <a href="#"> Assessment Partners</a>
          <a href="#"> Placement Brochure</a>
          <a href="#"> Career Development Cell</a>
        </div>

        <div>
          <h5>Connect</h5>
          <a href="#"> Image Gallery</a>
          <a href="#"> Video Gallery</a>
          <a href="#"> Media Coverage</a>
          <a href="#"> Brochure</a>
          <a href="#"> Newsletter</a>
          <a href="#"> Event Calender</a>
        </div>

        <div>
          <h1>Centurion University of Technology & Management(CUTM)</h1>
          <i className="fas fa-map-marker-alt "></i>
          <a href="#">
            {" "}
            HIG-4, Floor 1 and 2, Jaydev Vihar,Opp Pal Heights, Bhubaneswar,
            Dist: Khurda, Odisha, India.
          </a>
        </div>
      </div>
    </div>
  );
}
export default Footer;
