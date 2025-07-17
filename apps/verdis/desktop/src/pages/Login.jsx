import Login from "../components/authentication/Login";
// import packageJson from "../../package.json";
import wupperwurm from "../assets/wupperwurm.svg";
import versionData from "../version.json";
import { getApplicationVersion } from "@carma-commons/utils";

const Page = () => {
  const version = getApplicationVersion(versionData);
  return (
    <div className="h-screen">
      <div className="w-full flex h-full items-center justify-center bg-rain relative bg-cover">
        <div className="h-screen absolute w-full backdrop-blur" />
        <Login />
        <img
          src={wupperwurm}
          alt="Wupperwurm"
          className="absolute top-6 left-6 w-40"
        />
        <div className="absolute top-6 right-6 text-white/80 font-semibold flex flex-col gap-2 items-end text-right sm:max-w-none max-w-[200px]">
          <span>Stadt Wuppertal</span>
          <span>Vermessung, Katasteramt und Geodaten</span>
          <span>102.23 Kommunalservice Liegenschaftskataster</span>
        </div>
        <div className="absolute bottom-6 right-6 text-white/80 font-semibold flex flex-col gap-2 items-end text-right">
          <span>
            VerDIS Desktop {version}
            <br></br>
            powered by{" "}
            <a href="https://cismet.de/" target="_cismet">
              cismet GmbH
            </a>{" "}
            auf Basis von{" "}
            <a href="http://leafletjs.com/" target="_cismet">
              Leaflet
            </a>{" "}
            und{" "}
            <a href="https://github.com/cismet/carma" target="_cismet">
              carma
            </a>{" "}
            <br></br>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://cismet.de/datenschutzerklaerung.html"
            >
              Datenschutzerklärung
            </a>{" "}
            |{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://cismet.de/impressum.html"
            >
              Impressum
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
