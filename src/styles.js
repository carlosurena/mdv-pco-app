import { createStyles } from '@mantine/core';

export const tableStyles = createStyles((theme) => ({
  table: {
    color: theme.white,
    backgroundColor: theme.white,
    border: 2,
    borderRadius: theme.radius.md,
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,

    // // Use pseudo-classes just like you would in Sass
    // '&:hover': {
    //   backgroundColor: theme.colors.blue[9],
    // },

    // '&:not(:first-of-type)': {
    //   backgroundColor: theme.colors.violet[6],

    //   // pseudo-classes can be nested
    //   '&:hover': {
    //     backgroundColor: theme.colors.violet[9],
    //   },
    // },
  },
}));