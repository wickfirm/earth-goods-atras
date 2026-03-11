import { useLayout } from "../layout/core";
import { ThemeModeComponent } from "../assets/ts/layout";

// export const toAbsoluteUrl = (pathname: string, isCmsMedia: boolean = true) =>
//   (isCmsMedia ? import.meta.env.VITE_APP_BACKEND_URL : '/') + pathname;
  // import.meta.env.BASE_URL + pathname;

export const toAbsoluteUrl = (pathname: string, isCmsMedia = false): string =>
    isCmsMedia ? pathname : `${import.meta.env.VITE_APP_BACKEND_URL}${pathname}`;

export const useIllustrationsPath = (illustrationName: string): string => {
  const { config } = useLayout();

  const extension = illustrationName.substring(
    illustrationName.lastIndexOf("."),
    illustrationName.length
  );
  const illustration =toAbsoluteUrl
    ThemeModeComponent.getMode() === "dark"
      ? `${illustrationName.substring(
          0,
          illustrationName.lastIndexOf(".")
        )}-dark`
      : illustrationName.substring(0, illustrationName.lastIndexOf("."));
  return toAbsoluteUrl(
    `media/illustrations/${config.illustrations?.set}/${illustration}${extension}`
  );
};
