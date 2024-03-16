import { ExternalLinkIcon } from '@radix-ui/react-icons';

import { Button } from '../primitives/button';

export function RadixPrimitiveDocsButton({ name }: { name: string }) {
  return (
    <div className="dark !mb-6 flex gap-4">
      <Button variant="outline" size="sm" asChild>
        <a
          href={`https://www.radix-ui.com/docs/primitives/components/${name}`}
          className="!text-gray-11 !text-sm"
        >
          <ExternalLinkIcon className="mr-2 h-3 w-3" />
          Docs
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a
          href={`https://www.radix-ui.com/docs/primitives/components/${name}#api-reference`}
          className="!text-gray-11 !text-sm"
        >
          <ExternalLinkIcon className="mr-2 h-3 w-3" />
          API Reference
        </a>
      </Button>
    </div>
  );
}

export function PrimitiveDocsButton({
  docsUrl,
  apiReferenceUrl,
}: {
  docsUrl: string;
  apiReferenceUrl?: string;
}) {
  return (
    <div className="dark !mb-6 flex gap-4">
      <Button variant="outline" size="sm" asChild>
        <a href={docsUrl} className="!text-gray-11 !text-sm">
          <ExternalLinkIcon className="mr-2 h-3 w-3" />
          Docs
        </a>
      </Button>
      {apiReferenceUrl && (
        <Button variant="outline" size="sm" asChild>
          <a href={apiReferenceUrl} className="!text-gray-11 !text-sm">
            <ExternalLinkIcon className="mr-2 h-3 w-3" />
            API Reference
          </a>
        </Button>
      )}
    </div>
  );
}
