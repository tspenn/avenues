import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E2A35",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 32 32">
          <path
            fill="#B8E0E6"
            fillRule="evenodd"
            d="M16 5.2 26.8 26.8h-4.2l-1.7-4.2H11.1l-1.7 4.2H5.2L16 5.2Zm0 6.6 2.9 7.2h-5.8L16 11.8Z"
          />
        </svg>
      </div>
    ),
    size,
  );
}
