import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

type LoadingButtonProps = ComponentProps<typeof Button> & {
  loading?: boolean;
};

const LoadingButton = ({
  loading,
  disabled,
  children,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};

export default LoadingButton;
