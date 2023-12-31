{ inputs =
    { nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
      ps-tools.follows = "purs-nix/ps-tools";
      purs-nix.url = "github:purs-nix/purs-nix/ps-0.15";
      utils.url = "github:numtide/flake-utils";
    };

  outputs = { nixpkgs, utils, ... }@inputs:
    utils.lib.eachSystem [ "x86_64-linux" "x86_64-darwin" ]
      (system:
         let
           pkgs = nixpkgs.legacyPackages.${system};
           ps-tools = inputs.ps-tools.legacyPackages.${system};
           purs-nix = inputs.purs-nix { inherit system; };

           ps =
             purs-nix.purs
               { dependencies =
                   [ "console"
                     "effect"
                     "prelude"
                     "flame"
                     "undefined"
                     "web-uievents"
                     "web-html"
                     "web-cssom-view"
                     "web-pointerevents"
                     "debug"
                     "profunctor-lenses"
                     "fetch"
                     "arrays"
                     "simple-json"
                     "generate-values"
                     "numbers"
                     "exists"
                   ];

                 dir = ./.;
               };
         in
         { packages = rec {
             default = pkgs.stdenv.mkDerivation {
               name = "order-the-magnitudes";
               buildInputs = [];
               src = ./.;
               installPhase = ''
                 mkdir $out
                 cp ${bundle} $out/main.js
                 cp index.html $out/
                 cp style.css $out/
                 cp -r data $out/
               '';
             };
             bundle = ps.bundle {};
           };

           devShells.default =
             pkgs.mkShell
               { packages =
                   with pkgs;
                   [ entr
                     nodejs
                     (ps.command {})
                     ps-tools.for-0_15.purescript-language-server
                     purs-nix.esbuild
                     purs-nix.purescript
                     simple-http-server
                   ];

                 shellHook =
                   ''
                   alias watch="find src | entr -s 'echo bundling; purs-nix bundle'"
                   '';
               };
         }
      );
}
