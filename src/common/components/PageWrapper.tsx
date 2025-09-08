// src/common/components/PageWrapper.tsx

import { useEffect } from "react";

interface PageWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function PageWrapper({
  title,
  description,
  children,
}: PageWrapperProps) {
  useEffect(() => {
    document.title = title;

    // Change page description if exists
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);

  return <>{children}</>;
}
