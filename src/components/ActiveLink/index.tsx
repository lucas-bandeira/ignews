import {useRouter} from "next/router";
import React from "react";
import Link, {LinkProps} from "next/link";

interface ActiveLinkProps extends LinkProps {
    children: React.ReactElement;
    activeClassName: string;

}
export function ActiveLink({children, activeClassName, ...rest}: ActiveLinkProps) {
    const {asPath} = useRouter();
    const className = asPath === rest.href ? activeClassName : '';

    return (
      <Link {...rest}>
          {React.cloneElement(children, {className})}
      </Link>
    );
}