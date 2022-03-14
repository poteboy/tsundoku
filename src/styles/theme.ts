import { extendTheme, IButtonProps } from 'native-base';
import { colors } from '@src/styles';

export const theme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: ({ disabled }: IButtonProps) => {
          return {
            bg: disabled ? 'dark.500' : 'info.500',
            _text: {
              color: colors.White,
            },
          };
        },
      },
    },
  },
});
