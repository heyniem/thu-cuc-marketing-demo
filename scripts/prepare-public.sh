#!/usr/bin/env sh

set -eu

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
public_root="$project_root/public"

rm -rf "$public_root"
mkdir -p "$public_root/css" "$public_root/js" "$public_root/assets/projects"

cp "$project_root/index.html" "$public_root/"
cp "$project_root/css/base.css" "$project_root/css/components.css" "$project_root/css/layout.css" "$project_root/css/variables.css" "$public_root/css/"
cp "$project_root/js/app.js" "$project_root/js/router.js" "$public_root/js/"
cp "$project_root/assets/projects/cuc-portrait.webp" \
  "$project_root/assets/projects/evn-facade.webp" \
  "$project_root/assets/projects/evn-tiktok-grid.webp" \
  "$project_root/assets/projects/garnier-campaign.webp" \
  "$project_root/assets/projects/onelife-app.webp" \
  "$project_root/assets/projects/onelife-group-buy.webp" \
  "$project_root/assets/projects/onelife-storefront.webp" \
  "$public_root/assets/projects/"
cp "$project_root/CucNguyen_CV_Marketing_KL Commerce (1).pdf" "$public_root/"

printf '%s\n' "Prepared $public_root"
