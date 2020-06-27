import { ResponseInterceptor } from './response.interceptor';

describe('MetadataInterceptor', () => {
  it('should be defined', () => {
    expect(new ResponseInterceptor()).toBeDefined();
  });
});
