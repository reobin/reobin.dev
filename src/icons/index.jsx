import React from "react";
import classnames from "classnames";

export const IconKey = {
  externalKey: "external-key",
  star: "star",
  github: "github",
  gatsby: "gatsby",
  react: "react",
  python: "python",
  mongoDB: "mongodb",
  aws: "aws",
  shell: "shell",
};

export const ExternalLink = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={classnames("feather feather-external-link", className)}
  >
    <title>External Link</title>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

export const Star = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={classnames("feather feather-star", className)}
  >
    <title>Star</title>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export const GitHub = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={classnames("feather feather-github", className)}
  >
    <title>GitHub</title>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export const Gatsby = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28"
    focusable="false"
    className={className}
  >
    <title>GatsbyJS</title>
    <circle cx="14" cy="14" r="14" fill="#639" />
    <path
      fill="#fff"
      d="M6.2 21.8C4.1 19.7 3 16.9 3 14.2L13.9 25c-2.8-.1-5.6-1.1-7.7-3.2zm10.2 2.9L3.3 11.6C4.4 6.7 8.8 3 14 3c3.7 0 6.9 1.8 8.9 4.5l-1.5 1.3C19.7 6.5 17 5 14 5c-3.9 0-7.2 2.5-8.5 6L17 22.5c2.9-1 5.1-3.5 5.8-6.5H18v-2h7c0 5.2-3.7 9.6-8.6 10.7z"
    />
  </svg>
);

export const ReactIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 32 32"
    className={className}
  >
    <title>ReactJS</title>
    <g
      transform="matrix(.05696 0 0 .05696 .647744 2.43826)"
      fill="none"
      fillRule="evenodd"
    >
      <circle r="50.167" cy="237.628" cx="269.529" fill="#00d8ff" />
      <g stroke="#00d8ff" strokeWidth="24">
        <path d="M269.53 135.628c67.356 0 129.928 9.665 177.107 25.907 56.844 19.57 91.794 49.233 91.794 76.093 0 27.99-37.04 59.503-98.083 79.728-46.15 15.29-106.88 23.272-170.818 23.272-65.554 0-127.63-7.492-174.3-23.44-59.046-20.182-94.61-52.103-94.61-79.56 0-26.642 33.37-56.076 89.415-75.616 47.355-16.51 111.472-26.384 179.486-26.384z" />
        <path d="M180.736 186.922c33.65-58.348 73.28-107.724 110.92-140.48C337.006 6.976 380.163-8.48 403.43 4.937c24.248 13.983 33.042 61.814 20.067 124.796-9.8 47.618-33.234 104.212-65.176 159.6-32.75 56.788-70.25 106.82-107.377 139.272-46.98 41.068-92.4 55.93-116.185 42.213-23.08-13.3-31.906-56.92-20.834-115.233 9.355-49.27 32.832-109.745 66.8-168.664z" />
        <path d="M180.82 289.482C147.075 231.2 124.1 172.195 114.51 123.227c-11.544-59-3.382-104.11 19.864-117.566 24.224-14.024 70.055 2.244 118.14 44.94 36.356 32.28 73.688 80.837 105.723 136.173 32.844 56.733 57.46 114.21 67.036 162.582 12.117 61.213 2.31 107.984-21.453 121.74-23.057 13.348-65.25-.784-110.24-39.5-38.013-32.71-78.682-83.253-112.76-142.115z" />
      </g>
    </g>
  </svg>
);

export const Python = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 32 32"
    className={className}
  >
    <title>Python</title>
    <defs>
      <linearGradient
        id="A"
        x1="811.527"
        y1="574.895"
        x2="665.255"
        y2="573.732"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#366a96" />
        <stop offset="1" stopColor="#3679b0" />
      </linearGradient>
      <linearGradient
        id="B"
        x1="862.824"
        y1="642.176"
        x2="573.276"
        y2="642.176"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#ffc836" />
        <stop offset="1" stopColor="#ffe873" />
      </linearGradient>
    </defs>
    <g transform="matrix(.1617 0 0 .158089 -107.53764 -81.66187)">
      <path
        d="M716.255 544.487c0-13.623 3.653-21.034 23.822-24.563 13.693-2.4 31.25-2.7 47.627 0 12.935 2.135 23.822 11.77 23.822 24.563v44.945c0 13.182-10.57 23.98-23.822 23.98h-47.627c-16.164 0-29.787 13.782-29.787 29.363v21.564h-16.376c-13.852 0-21.917-9.988-25.305-23.964-4.57-18.776-4.376-29.963 0-47.945 3.794-15.687 15.917-23.964 29.77-23.964h65.52v-6h-47.645v-17.98z"
        fill="url(#A)"
      />
      <path
        d="M811.527 688.32c0 13.623-11.823 20.523-23.822 23.964-18.052 5.188-32.54 4.394-47.627 0-12.6-3.67-23.822-11.17-23.822-23.964v-44.945c0-12.935 10.782-23.98 23.822-23.98h47.627c15.864 0 29.787-13.71 29.787-29.963v-20.964h17.858c13.87 0 20.4 10.305 23.822 23.964 4.764 18.97 4.976 33.157 0 47.945-4.817 14.364-9.97 23.964-23.822 23.964H763.9v6h47.627v17.98z"
        fill="url(#B)"
      />
      <path
        d="M728.166 541.505c0-4.976 3.988-9 8.93-9 4.923 0 8.93 4.023 8.93 9 0 4.96-4.006 8.982-8.93 8.982-4.94 0-8.93-4.023-8.93-8.982zm53.59 149.798c0-4.96 4.006-8.982 8.93-8.982 4.94 0 8.93 4.023 8.93 8.982 0 4.976-3.988 9-8.93 9-4.923 0-8.93-4.023-8.93-9z"
        fill="#fff"
      />
    </g>
  </svg>
);

export const MongoDB = ({ className }) => (
  <svg
    height="64"
    viewBox="0 0 32 32"
    width="64"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <title>MongoDB</title>
    <path
      d="m15.9.087.854 1.604c.192.296.4.558.645.802.715.715 1.394 1.464 2.004 2.266 1.447 1.9 2.423 4.01 3.12 6.292.418 1.394.645 2.824.662 4.27.07 4.323-1.412 8.035-4.4 11.12-.488.488-1.01.94-1.57 1.342-.296 0-.436-.227-.558-.436-.227-.383-.366-.82-.436-1.255-.105-.523-.174-1.046-.14-1.586v-.244c-.024-.052-.285-24.052-.181-24.175z"
      fill="#599636"
    />
    <path
      d="m15.9.034c-.035-.07-.07-.017-.105.017.017.35-.105.662-.296.96-.21.296-.488.523-.767.767-1.55 1.342-2.77 2.963-3.747 4.776-1.3 2.44-1.97 5.055-2.16 7.808-.087.993.314 4.497.627 5.508.854 2.684 2.388 4.933 4.375 6.885.488.47 1.01.906 1.55 1.325.157 0 .174-.14.21-.244a4.78 4.78 0 0 0 .157-.68l.35-2.614z"
      fill="#6cac48"
    />
    <path
      d="m16.754 28.845c.035-.4.227-.732.436-1.063-.21-.087-.366-.26-.488-.453-.105-.174-.192-.383-.26-.575-.244-.732-.296-1.5-.366-2.248v-.453c-.087.07-.105.662-.105.75a17.37 17.37 0 0 1 -.314 2.353c-.052.314-.087.627-.28.906 0 .035 0 .07.017.122.314.924.4 1.865.453 2.824v.35c0 .418-.017.33.33.47.14.052.296.07.436.174.105 0 .122-.087.122-.157l-.052-.575v-1.604c-.017-.28.035-.558.07-.82z"
      fill="#c2bfbf"
    />
  </svg>
);

export const AWS = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 32 32"
    className={className}
  >
    <title>AWS</title>
    <path
      d="M15.63 31.388l-7.135-2.56V18.373l7.135 2.43zm1.3 0l7.135-2.56V18.373l-7.135 2.432zm-7.7-13.8l7.2-2.033 6.696 2.16-6.696 2.273zm-2.092-.8L0 14.22V3.75l7.135 2.43zm1.307 0l7.135-2.56V3.75L8.443 6.192zm-7.7-13.8l7.2-2.043 6.696 2.16-6.696 2.273zm23.052 13.8l-7.135-2.56V3.75l7.135 2.43zm1.3 0l7.135-2.56V3.75l-7.135 2.43zm-7.7-13.8l7.2-2.033 6.696 2.16-6.696 2.273z"
      fill="#f90"
      fillRule="evenodd"
    />
  </svg>
);

export const Shell = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 32 32"
    className={className}
  >
    <title>shell</title>
    <path
      d="M28.057 6.53L17.952.532a3.8 3.8 0 0 0-3.88 0L3.965 6.53A4.03 4.03 0 0 0 2 10.002v11.996a4.03 4.03 0 0 0 1.948 3.472l10.105 5.998a3.8 3.8 0 0 0 3.88 0L28.04 25.47a4.03 4.03 0 0 0 1.948-3.472V10.002a4.03 4.03 0 0 0-1.93-3.472zM20.23 25.262v.86c-.001.108-.057.207-.148.265l-.512.293c-.08.042-.148 0-.148-.113v-.847a1.66 1.66 0 0 1-1.164.113c-.062-.042-.086-.122-.056-.2l.183-.78c.016-.066.05-.125.102-.17a.18.18 0 0 1 .05-.035.11.11 0 0 1 .08 0 1.41 1.41 0 0 0 1.059-.134 1.41 1.41 0 0 0 .79-1.21c0-.438-.24-.62-.82-.625-.734 0-1.4-.14-1.43-1.224.017-.937.452-1.817 1.186-2.4v-.872c-.001-.1.056-.2.148-.268l.494-.314c.08-.042.148 0 .148.116v.872a1.61 1.61 0 0 1 .967-.116c.07.04.098.128.064.2l-.173.773c-.015.06-.045.113-.088.155-.014.015-.03.028-.05.04s-.05.008-.074 0a1.28 1.28 0 0 0-.931.152 1.17 1.17 0 0 0-.706 1.037c0 .395.208.515.907.53.935 0 1.337.423 1.348 1.362-.018.983-.467 1.908-1.228 2.53zm5.293-1.45c.012.074-.018.15-.078.194L22.9 25.558c-.024.02-.06.023-.087.007s-.04-.05-.033-.08v-.66c.003-.072.05-.136.116-.162l2.516-1.507c.024-.02.06-.023.087-.007s.04.05.033.08v.582zM27.288 9.06l-9.562 5.906c-1.193.706-2.07 1.478-2.07 2.914v11.778c0 .86.353 1.4.882 1.58a3.14 3.14 0 0 1-.53.053 3.13 3.13 0 0 1-1.595-.441L4.308 24.853C3.3 24.25 2.702 23.165 2.706 22V10.002C2.7 8.834 3.3 7.75 4.308 7.144l10.105-5.998c.98-.58 2.196-.58 3.176 0l10.105 5.998c.833.504 1.4 1.35 1.552 2.3-.328-.713-1.083-.9-1.962-.395h.003z"
      fill="#1b1b1f"
      fillRule="evenodd"
    />
  </svg>
);

export const IconByKey = ({ iconKey, className }) => {
  switch (iconKey) {
    case IconKey.externalKey:
      return <ExternalLink className={className} />;
    case IconKey.star:
      return <Star className={className} />;
    case IconKey.github:
      return <GitHub className={className} />;
    case IconKey.gatsby:
      return <Gatsby className={className} />;
    case IconKey.react:
      return <ReactIcon className={className} />;
    case IconKey.python:
      return <Python className={className} />;
    case IconKey.mongoDB:
      return <MongoDB className={className} />;
    case IconKey.aws:
      return <AWS className={className} />;
    case IconKey.shell:
      return <Shell className={className} />;
    default:
      return null;
  }
};
