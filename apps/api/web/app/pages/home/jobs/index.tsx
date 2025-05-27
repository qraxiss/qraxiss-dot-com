// Import Dependencies
import { useState, useEffect } from "react";

// Local Imports
import { Page } from "@/components/shared/Page";
import { OnboardingItem } from "./OnboardingItem";
import { items } from "./items";

// ----------------------------------------------------------------------

interface HomeProps {
  pageProps?: {
    data?: number;
  };
  appProps?: Record<string, any>;
}

export default function Home(props: HomeProps) {
  // State to hold props
  const [pageProps, setPageProps] = useState(props?.pageProps);
  const [appProps, setAppProps] = useState(props?.appProps);
  
  useEffect(() => {
    // Client-side'da props yoksa window'dan al
    if (typeof window !== 'undefined' && !props?.pageProps) {
      const state = (window as any).__INITIAL_STATE__;
      if (state?.props) {
        setPageProps(state.props.pageProps);
        setAppProps(state.props.appProps);
      }
    }
  }, [props]);

  return (
    <Page title="Onboarding v1">
      <div className="transition-content w-full px-(--margin-x) pb-8">
        <div className="py-5 text-center lg:py-6">
          <p className="text-sm uppercase">Are you new here?</p>
          <h3 className="dark:text-dark-100 mt-1 text-xl font-semibold text-gray-600">
            Welcome. Where do you like to Start?
          </h3>
          {pageProps?.data && (
            <p className="mt-2 text-lg text-blue-600">
              Data from backend: {pageProps.data}
            </p>
          )}
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {items.map((item) => (
            <OnboardingItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              action={item.action}
              actionLabel={item.actionLabel}
              Image={item.Image}
            />
          ))}
        </div>
      </div>
    </Page>
  );
}
