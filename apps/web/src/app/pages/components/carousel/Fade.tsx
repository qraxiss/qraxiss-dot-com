// Import Dependencies
import { register } from "swiper/element/bundle";

// Local Imports
import { randomId } from "@/utils/randomId";
import { useThemeContext } from "@/app/contexts/theme/context";
import { useLocaleContext } from "@/app/contexts/locale/context";

// ----------------------------------------------------------------------

register();

const images = [
  { id: randomId(), img: "/web/images/objects/object-14.jpg" },
  { id: randomId(), img: "/web/images/objects/object-3.jpg" },
  { id: randomId(), img: "/web/images/objects/object-2.jpg" },
  { id: randomId(), img: "/web/images/objects/object-9.jpg" },
];

export function Fade() {
  const { primaryColorScheme: primary } = useThemeContext();
  const { direction } = useLocaleContext();

  return (
    <div className="max-w-md">
      {/* @ts-expect-error - Swiper web components */}
      <swiper-container
        effect="fade"
        navigation="true"
        slides-per-view="1"
        dir={direction}
        style={
          {
            "--swiper-navigation-size": "32px",
            "--swiper-theme-color": primary[400],
            "--swiper-pagination-color": primary[600],
          } as React.CSSProperties
        }
      >
        {images.map(({ img, id }) => (
          // @ts-expect-error - Swiper web components
          <swiper-slide key={id}>
            <img
              className="h-full w-full rounded-lg object-cover"
              src={img}
              alt="object"
              loading="lazy"
            />
            {/* @ts-expect-error - Swiper web components */}
          </swiper-slide>
        ))}
        {/* @ts-expect-error - Swiper web components */}
      </swiper-container>
    </div>
  );
}
