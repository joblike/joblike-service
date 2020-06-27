import { MetadataMiddleware } from './metadata.middleware';

describe('MetadataMiddleware', () => {
  it('should be defined', () => {
    expect(new MetadataMiddleware()).toBeDefined();
  });
});
