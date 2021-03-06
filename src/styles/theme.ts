import { extendTheme, IButtonProps } from 'native-base';
import { colors } from '@src/styles';

export const theme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: ({ disabled }: IButtonProps) => {
          return {
            px: 16,
            py: 12,
            bg: disabled ? 'dark.500' : colors.Main,
            _text: {
              color: colors.White,
              fontSize: 'lg',
            },
            _pressed: {
              bg: colors.MainPressed,
            },
          };
        },
        danger: ({ disabled }: IButtonProps) => {
          return {
            px: 16,
            py: 12,
            bg: disabled ? 'dark.500' : 'danger.500',
            _text: {
              color: colors.White,
              fontSize: 'lg',
            },
            _pressed: {
              bg: 'danger.600',
            },
          };
        },
        outline: ({ disabled }: IButtonProps) => {
          return {
            px: 16,
            py: 12,
            bg: colors.White,
            borderColor: colors.Main,
            borderWidth: 1,
            _text: {
              color: colors.Main,
              fontSize: 'lg',
            },
            _pressed: {
              bg: colors.lightGray,
              borderColor: colors.Main,
            },
          };
        },
      },
    },
  },
});
