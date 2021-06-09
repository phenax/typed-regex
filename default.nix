with import <nixpkgs> {};
mkShell {
  buildInputs = with nodePackages; [
    nodejs-16_x
    yarn

    typescript
    typescript-language-server
  ];
}
