package com.example.domain;

public class BBSPhotoVO extends BBSVO{
    private int bbsPhoto_key;
	    private int bbsPhoto_bbs_Key;
	    private String bbsPhoto_filename;
	    private int bbsPhoto_sequence;
	    
		public int getBbsPhoto_key() {
			return bbsPhoto_key;
		}
		public void setBbsPhoto_key(int bbsPhoto_key) {
			this.bbsPhoto_key = bbsPhoto_key;
		}
		public int getBbsPhoto_bbs_Key() {
			return bbsPhoto_bbs_Key;
		}
		public void setBbsPhoto_bbs_Key(int bbsPhoto_bbs_Key) {
			this.bbsPhoto_bbs_Key = bbsPhoto_bbs_Key;
		}
		public String getBbsPhoto_filename() {
			return bbsPhoto_filename;
		}
		public void setBbsPhoto_filename(String bbsPhoto_filename) {
			this.bbsPhoto_filename = bbsPhoto_filename;
		}
		public int getBbsPhoto_sequence() {
			return bbsPhoto_sequence;
		}
		public void setBbsPhoto_sequence(int bbsPhoto_sequence) {
			this.bbsPhoto_sequence = bbsPhoto_sequence;
		}
		
		@Override
		public String toString() {
			return "BBSPhotoVO [bbsPhoto_key=" + bbsPhoto_key + ", bbsPhoto_bbs_Key=" + bbsPhoto_bbs_Key
					+ ", bbsPhoto_filename=" + bbsPhoto_filename + ", bbsPhoto_sequence=" + bbsPhoto_sequence + "]";
		}
}
