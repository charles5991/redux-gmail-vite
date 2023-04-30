import { useRef, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import SvgMap from "./SvgMap";
import useScript from "../utils/hooks/useScript";
import objectToQueryParams from "../utils/objectToQueryParams";

export default function Gmap({
  src = "https://maps.googleapis.com/maps/api/js",
  params,
  mapOptions,
  onLoad,
  onError,
}) {
  const gmapApi = useScript(
    src + (params ? "?" + objectToQueryParams(params) : "")
  );
  const mapRef = useRef();

  useEffect(() => {
    const GOOGLE = window.google;
    if (gmapApi === "ready" && GOOGLE) {
      const api = {
        maps: GOOGLE.maps,
        map: new GOOGLE.maps.Map(
          mapRef.current,
          mapOptions || {
            center: { lat: 13.7321909, lng: 23.8158213 },
            zoom: 3,
            mapTypeControl: false,
          }
        ),
      };

      onLoad?.(api);
      return;
    }

    if (gmapApi === "error") {
      onError?.(gmapApi);
    }
  }, [gmapApi]);

  return (
    <>
      <Backdrop
        sx={{ zIndex: 1000002, color: "#fff", cursor: "wait" }}
        open={gmapApi === "loading"}
        hidden={gmapApi === "ready"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div ref={mapRef} id="gmap">
        {gmapApi === "loading" && <SvgMap />}
      </div>
    </>
  );
}
