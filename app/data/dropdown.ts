export interface DropdownProps {
    primaryName: string;
    pages: { name: string; link: string }[];
}

export const aboutOptions = {
    primaryName: "About",
    pages: [
        {name: "Officers", link: "/about"}, 
        {name: "Alumni", link: "/alumni"},
        {name: "FAQ", link: "/faq"}
    ]
};

export const resourceOptions = {
    primaryName: "Resources",
    pages: [
        {name: "Events", link: "/events"},
        {name: "Projects", link: "/projects"},
        {name: "Calendar", link: "/calendar"},
    ]
};