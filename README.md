## [SURFnet-grouphub](#surfnet-grouphub)

Middleman project with static SURFnet-grouphub site.

### [System Requirements](#system-requirements)

- ruby

### [Install](#install)

```bash
bundle install --path vendor/bundle
bundle exec middleman
```

To build a new version and deploy to [github.io](http://oharsta.github.io/SURF-grouphub/build/)

```bash
git checkout gh-pages
bundle exec middleman build
git push
```


