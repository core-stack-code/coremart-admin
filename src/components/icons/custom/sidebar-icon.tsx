import * as React from "react";

export const DashboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 13V17M16 11V17M12 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
        stroke={props.stroke || "#000"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ProductsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <svg
      width={20}
      height={22}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.27 1.39 1.71 3.47c-.309.412-.463.618-.46.79a.5.5 0 0 0 .192.384c.136.106.393.106.908.106h14.8c.515 0 .773 0 .908-.106a.5.5 0 0 0 .192-.384c.003-.172-.151-.378-.46-.79l-1.56-2.08m-12.96 0c.176-.235.264-.352.376-.437a1 1 0 0 1 .33-.165C4.11.75 4.255.75 4.55.75h10.4c.293 0 .44 0 .575.038a1 1 0 0 1 .33.165c.111.085.199.202.375.437m-12.96 0L1.39 3.897c-.237.316-.356.475-.44.649a2 2 0 0 0-.163.487c-.037.19-.037.388-.037.784V17.55c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.428.218.988.218 2.108.218h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108V5.817c0-.396 0-.594-.037-.784a2 2 0 0 0-.163-.487c-.084-.174-.203-.333-.44-.65L16.23 1.39m-2.48 7.36a4 4 0 1 1-8 0"
        stroke={props.stroke || "#000"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const OrdersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 3H19V21L17.9682 20.1156C17.2193 19.4737 16.1141 19.4737 15.3651 20.1156L14.3333 21L13.3016 20.1156C12.5526 19.4737 11.4474 19.4737 10.6984 20.1156L9.66667 21L8.63492 20.1156C7.88594 19.4737 6.78073 19.4737 6.03175 20.1156L5 21V3Z"
        stroke={props.stroke || "#000"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 7L9 7"
        stroke={props.stroke || "#000"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 11L9 11"
        stroke={props.stroke || "#000"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 15L11 15"
        stroke={props.stroke || "#000"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CustomersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"
        stroke={props.stroke || "#000"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BrandAndAttributesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.5 7.277 12 12m0 0L3.5 7.277M12 12v9.5m9-5.442V7.941c0-.343 0-.514-.05-.667a1 1 0 0 0-.215-.364c-.109-.118-.258-.201-.558-.368l-7.4-4.11c-.284-.158-.425-.237-.575-.268a1 1 0 0 0-.403 0c-.15.03-.292.11-.576.267l-7.4 4.111c-.3.167-.45.25-.558.368a1 1 0 0 0-.215.364C3 7.427 3 7.598 3 7.941v8.117c0 .343 0 .514.05.667a1 1 0 0 0 .215.364c.109.118.258.201.558.368l7.4 4.11c.284.159.425.237.576.268.133.027.27.027.402 0 .15-.03.292-.11.576-.267l7.4-4.111c.3-.167.45-.25.558-.368a1 1 0 0 0 .215-.364c.05-.153.05-.324.05-.667M16.5 9.5l-9-5"
        stroke={props.stroke || "#000"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CategoriesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx={4.05}
        cy={13.9494}
        r={3.3}
        stroke={props.stroke || "#000"}
        strokeWidth={1.5}
      />
      <circle
        cx={13.9504}
        cy={4.05}
        r={3.3}
        stroke={props.stroke || "#000"}
        strokeWidth={1.5}
      />
      <mask id="path-3-inside-1_3357_1170" fill="white">
        <rect width={8.1} height={8.1} rx={1} />
      </mask>
      <rect
        width={8.1}
        height={8.1}
        rx={1}
        stroke={props.stroke || "#000"}
        strokeWidth={3}
        mask="url(#path-3-inside-1_3357_1170)"
      />
      <mask id="path-4-inside-2_3357_1170" fill="white">
        <rect x={9.90039} y={9.89941} width={8.1} height={8.1} rx={1} />
      </mask>
      <rect
        x={9.90039}
        y={9.89941}
        width={8.1}
        height={8.1}
        rx={1}
        stroke={props.stroke || "#000"}
        strokeWidth={3}
        mask="url(#path-4-inside-2_3357_1170)"
      />
    </svg>
  );
};

export const DiscountsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 9H9.01M15 15H15.01M16 8L8 16M17.9012 4.99851C18.1071 5.49653 18.5024 5.8924 19.0001 6.09907L20.7452 6.82198C21.2433 7.02828 21.639 7.42399 21.8453 7.92206C22.0516 8.42012 22.0516 8.97974 21.8453 9.47781L21.1229 11.2218C20.9165 11.7201 20.9162 12.2803 21.1236 12.7783L21.8447 14.5218C21.9469 14.7685 21.9996 15.0329 21.9996 15.2999C21.9997 15.567 21.9471 15.8314 21.8449 16.0781C21.7427 16.3249 21.5929 16.549 21.4041 16.7378C21.2152 16.9266 20.991 17.0764 20.7443 17.1785L19.0004 17.9009C18.5023 18.1068 18.1065 18.5021 17.8998 18.9998L17.1769 20.745C16.9706 21.2431 16.575 21.6388 16.0769 21.8451C15.5789 22.0514 15.0193 22.0514 14.5212 21.8451L12.7773 21.1227C12.2792 20.9169 11.7198 20.9173 11.2221 21.1239L9.47689 21.8458C8.97912 22.0516 8.42001 22.0514 7.92237 21.8453C7.42473 21.6391 7.02925 21.2439 6.82281 20.7464L6.09972 19.0006C5.8938 18.5026 5.49854 18.1067 5.00085 17.9L3.25566 17.1771C2.75783 16.9709 2.36226 16.5754 2.15588 16.0777C1.94951 15.5799 1.94923 15.0205 2.1551 14.5225L2.87746 12.7786C3.08325 12.2805 3.08283 11.7211 2.8763 11.2233L2.15497 9.47678C2.0527 9.2301 2.00004 8.96568 2 8.69863C1.99996 8.43159 2.05253 8.16715 2.15472 7.92043C2.25691 7.67372 2.40671 7.44955 2.59557 7.26075C2.78442 7.07195 3.00862 6.92222 3.25537 6.8201L4.9993 6.09772C5.49687 5.89197 5.89248 5.4972 6.0993 5.00006L6.82218 3.25481C7.02848 2.75674 7.42418 2.36103 7.92222 2.15473C8.42027 1.94842 8.97987 1.94842 9.47792 2.15473L11.2218 2.87712C11.7199 3.08291 12.2793 3.08249 12.7771 2.87595L14.523 2.15585C15.021 1.94966 15.5804 1.9497 16.0784 2.15597C16.5763 2.36223 16.972 2.75783 17.1783 3.25576L17.9014 5.00153L17.9012 4.99851ZM9.5 9C9.5 9.27614 9.27614 9.5 9 9.5C8.72386 9.5 8.5 9.27614 8.5 9C8.5 8.72386 8.72386 8.5 9 8.5C9.27614 8.5 9.5 8.72386 9.5 9ZM15.5 15C15.5 15.2761 15.2761 15.5 15 15.5C14.7239 15.5 14.5 15.2761 14.5 15C14.5 14.7239 14.7239 14.5 15 14.5C15.2761 14.5 15.5 14.7239 15.5 15Z"
        stroke={props.stroke || "#000"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
