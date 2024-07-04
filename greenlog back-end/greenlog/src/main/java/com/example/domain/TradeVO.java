package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TradeVO {
	private int trade_key;
	private String trade_from;
	private String trade_to;
	private int trade_amount;

	@JsonFormat(pattern = "yyyy년MM월dd일 HH:mm:ss", timezone = "Asia/Seoul")
	private Date trade_date;

	private int trade_state;

	public int getTrade_key() {
		return trade_key;
	}

	public void setTrade_key(int trade_key) {
		this.trade_key = trade_key;
	}

	public String getTrade_from() {
		return trade_from;
	}

	public void setTrade_from(String trade_from) {
		this.trade_from = trade_from;
	}

	public String getTrade_to() {
		return trade_to;
	}

	public void setTrade_to(String trade_to) {
		this.trade_to = trade_to;
	}

	public int getTrade_amount() {
		return trade_amount;
	}

	public void setTrade_amount(int trade_amount) {
		this.trade_amount = trade_amount;
	}

	public Date getTrade_date() {
		return trade_date;
	}

	public void setTrade_date(Date trade_date) {
		this.trade_date = trade_date;
	}

	public int getTrade_state() {
		return trade_state;
	}

	public void setTrade_state(int trade_state) {
		this.trade_state = trade_state;
	}

	@Override
	public String toString() {
		return "TradeVO [trade_key=" + trade_key + ", trade_from=" + trade_from + ", trade_to=" + trade_to
				+ ", trade_amount=" + trade_amount + ", trade_date=" + trade_date + ", trade_state=" + trade_state
				+ "]";
	}

}
